using SimpleInjector;

namespace Backend
{
    public static class InjectService
    {
        private static Container container;

        public static void SetContainer(Container container)
        {
            InjectService.container = container;
        }

        public static T GetInstance<T>() where T : class
        {
            return container.GetInstance<T>();
        }
    }
}
