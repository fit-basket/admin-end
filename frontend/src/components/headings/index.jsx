function SectionHeading({ title }) {
  return (
    <div className="py-5">
      <h3 className="text-start text-lg font-bold leading-6  text-gray-900">
        {title}
      </h3>
    </div>
  );
}

function PageHeading({ title }) {
  return (
    <h2 className="text-base font-bold leading-7 text-gray-400 text-start sm:text-base sm:truncate">
      {title}
    </h2>
  );
}

export { SectionHeading, PageHeading };
