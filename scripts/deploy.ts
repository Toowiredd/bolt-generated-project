#!/usr/bin/env node
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';

const execAsync = promisify(exec);

interface DeployConfig {
  valtown: {
    apiKey: string;
    username: string;
  };
  environment: string;
}

async function loadConfig(): Promise<DeployConfig> {
  try {
    const configPath = path.join(process.cwd(), 'deploy.config.json');
    const configData = await fs.readFile(configPath, 'utf-8');
    return JSON.parse(configData);
  } catch (error) {
    console.error(chalk.red('Error loading deploy.config.json'));
    console.error(chalk.yellow('Please create deploy.config.json with the following structure:'));
    console.log(`
{
  "valtown": {
    "apiKey": "your-api-key",
    "username": "your-username"
  },
  "environment": "production"
}
    `);
    process.exit(1);
  }
}

async function validateConfig(config: DeployConfig): Promise<void> {
  const required = ['valtown.apiKey', 'valtown.username', 'environment'];
  const missing = required.filter(key => {
    const parts = key.split('.');
    let value: any = config;
    for (const part of parts) {
      value = value[part];
      if (!value) return true;
    }
    return false;
  });

  if (missing.length > 0) {
    console.error(chalk.red('Missing required configuration:'));
    missing.forEach(key => console.error(chalk.yellow(`- ${key}`)));
    process.exit(1);
  }
}

async function buildProject(): Promise<void> {
  console.log(chalk.blue('Building project...'));
  try {
    await execAsync('npm run build');
    console.log(chalk.green('Build successful'));
  } catch (error) {
    console.error(chalk.red('Build failed:'));
    console.error(error);
    process.exit(1);
  }
}

async function deployValTownFunctions(config: DeployConfig): Promise<void> {
  console.log(chalk.blue('Deploying Val Town functions...'));

  const functionFiles = [
    'conversation-storage.js'
  ];

  for (const file of functionFiles) {
    try {
      const functionPath = path.join(process.cwd(), 'dist', 'val', file);
      const functionContent = await fs.readFile(functionPath, 'utf-8');

      console.log(chalk.blue(`Deploying ${file}...`));

      // Use Val Town API to deploy function
      const response = await fetch('https://api.val.town/v1/functions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.valtown.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: file.replace('.js', ''),
          code: functionContent,
          public: false
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to deploy ${file}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(chalk.green(`Successfully deployed ${file}`));
      console.log(chalk.blue('Function URL:'), chalk.yellow(result.url));
    } catch (error) {
      console.error(chalk.red(`Failed to deploy ${file}:`));
      console.error(error);
      process.exit(1);
    }
  }
}

async function updateEnvironmentFile(config: DeployConfig): Promise<void> {
  console.log(chalk.blue('Updating environment configuration...'));

  try {
    const envPath = path.join(process.cwd(), '.env');
    const envExample = await fs.readFile(path.join(process.cwd(), '.env.example'), 'utf-8');

    // Replace environment variables
    const envContent = envExample
      .replace('your-valtown-api-key', config.valtown.apiKey)
      .replace('development', config.environment);

    await fs.writeFile(envPath, envContent);
    console.log(chalk.green('Environment configuration updated'));
  } catch (error) {
    console.error(chalk.red('Failed to update environment configuration:'));
    console.error(error);
    process.exit(1);
  }
}

async function deploy(): Promise<void> {
  console.log(chalk.blue('Starting deployment process...'));

  const config = await loadConfig();
  await validateConfig(config);
  await buildProject();
  await deployValTownFunctions(config);
  await updateEnvironmentFile(config);

  console.log(chalk.green('\nDeployment completed successfully!'));
  console.log(chalk.blue('\nNext steps:'));
  console.log('1. Start the server:', chalk.yellow('npm start'));
  console.log('2. Monitor logs:', chalk.yellow('npm run logs'));
  console.log('3. Check Val Town dashboard for function status');
}

// Run deployment
deploy().catch(error => {
  console.error(chalk.red('Deployment failed:'));
  console.error(error);
  process.exit(1);
});
