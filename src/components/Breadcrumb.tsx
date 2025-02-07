import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; path: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center text-sm font-medium text-gray-400 mb-4">
      <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
      {items.map((item, index) => (
        <React.Fragment key={item.path}>
          <ChevronRight className="w-4 h-4 mx-2" />
          {index === items.length - 1 ? (
            <span className="text-amber-500">{item.label}</span>
          ) : (
            <Link to={item.path} className="hover:text-amber-500 transition-colors">{item.label}</Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
