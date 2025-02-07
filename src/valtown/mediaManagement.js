// @ts-ignore
import { db } from "https://esm.sh/@val/db";

export const uploadMedia = async (file, metadata) => {
  const id = Date.now().toString();
  await db.set(`media:${id}`, file);
  await db.set(`metadata:${id}`, JSON.stringify(metadata));
  return id;
};

export const getMedia = async (id) => {
  return await db.get(`media:${id}`);
};

export const getMetadata = async (id) => {
  const metadata = await db.get(`metadata:${id}`);
  return JSON.parse(metadata);
};

export const addTag = async (id, tag) => {
  const metadata = await getMetadata(id);
  metadata.tags = [...(metadata.tags || []), tag];
  await db.set(`metadata:${id}`, JSON.stringify(metadata));
};

export const createVersion = async (id, file) => {
  const metadata = await getMetadata(id);
  const versionId = Date.now().toString();
  await db.set(`media:${id}:${versionId}`, file);
  metadata.versions = [...(metadata.versions || []), versionId];
  await db.set(`metadata:${id}`, JSON.stringify(metadata));
  return versionId;
};
