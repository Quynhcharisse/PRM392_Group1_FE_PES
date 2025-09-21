// Page template components
import { Card, CardHeader, CardContent } from '@atoms';

export const PageTemplate = ({ 
  title, 
  subtitle,
  headerActions,
  children, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 py-8 ${className}`} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              {title && (
                <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-gray-500">
                  {subtitle}
                </p>
              )}
            </div>
            {headerActions && (
              <div className="mt-4 flex md:mt-0 md:ml-4">
                {headerActions}
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export const DashboardTemplate = ({ 
  title, 
  subtitle,
  stats,
  actions,
  children, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              {title && (
                <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-gray-500">
                  {subtitle}
                </p>
              )}
            </div>
            {actions && (
              <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
                {actions}
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        {stats && (
          <div className="mb-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {stat.icon}
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {stat.name}
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {stat.value}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export const FormTemplate = ({ 
  title,
  subtitle,
  onSubmit,
  children,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  onCancel,
  loading = false,
  className = '',
  ...props 
}) => {
  return (
    <div className={`max-w-2xl mx-auto ${className}`} {...props}>
      <Card>
        {(title || subtitle) && (
          <CardHeader>
            {title && (
              <h2 className="text-lg font-medium text-gray-900">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">
                {subtitle}
              </p>
            )}
          </CardHeader>
        )}
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            {children}
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {cancelLabel}
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  submitLabel
                )}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};