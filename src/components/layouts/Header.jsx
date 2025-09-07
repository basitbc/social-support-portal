
const Header = ({
  headerTitle = 'Social Support Portal',
  headerSubtitle = 'Government Financial Assistance',
  headerActions,
  dir = 'ltr',
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200" dir={dir}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-primary-600 rounded flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">Gov</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{headerTitle}</h1>
                {headerSubtitle && (
                  <p className="text-xs text-gray-600 hidden sm:block">{headerSubtitle}</p>
                )}
              </div>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            {headerActions}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
