import React, { useState } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { Send } from 'lucide-react';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', { name, email, message });
  };

  return (
    <div className="min-h-screen bg-midnight-blue pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb items={[{ label: 'Contact', path: '/contact' }]} />
        <h1 className="text-4xl font-art-nouveau text-amber-300 mb-8">Contact Us</h1>
        <div className="bg-deep-purple/30 rounded-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-midnight-blue border border-amber-500/30 rounded-lg focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-gray-100"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-midnight-blue border border-amber-500/30 rounded-lg focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-gray-100"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-midnight-blue border border-amber-500/30 rounded-lg focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-gray-100 resize-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-amber-500 text-midnight-blue rounded-lg hover:bg-amber-400 transition-colors flex items-center justify-center"
            >
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
