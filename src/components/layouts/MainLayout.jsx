import { cn } from '../../utils/helpers';
import Header from './Header';

const MainLayout = ({
  children,
  showHeader = true,
  headerTitle = 'Social Support Portal',
  headerSubtitle = 'Government Financial Assistance',
  headerActions,
  maxWidth = '7xl',
  dir = 'ltr',
  className,
  ...props
}) => {
  const maxWidthClasses = {
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
  };

  return (
    <div className={cn('min-h-screen flex flex-col bg-white', className)} {...props} dir={dir}>
      {/* Header */}
      {showHeader && (
        <Header
          headerTitle={headerTitle}
          headerSubtitle={headerSubtitle}
          headerActions={headerActions}
          dir={dir}
        />
      )}

      {/* Main Content */}
      <main className="flex-1">
        <div className={cn('mx-auto px-4 sm:px-6 lg:px-8 py-8', maxWidthClasses[maxWidth])}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
