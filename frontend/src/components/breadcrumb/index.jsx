import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function BreadCrumb({ title, crumbs }) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        <li>
          <div>
            <a href="/" className="text-gray-400 hover:text-gray-500">
              <span className="text-sm font-medium text-gray-500 hover:text-gray-700">
                {title}
              </span>
            </a>
          </div>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="flex-shrink-0 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <a
                href={crumb.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={crumb.current ? "page" : undefined}
              >
                {crumb.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
