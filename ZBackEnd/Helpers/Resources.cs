using System;
using System.IO;
using System.Web;
using System.Web.Configuration;

namespace Backend.Helpers
{

    public static class Resources
    {
        private static string resourceRootPath;
        public static string ResourceRootPath
        {
            get
            {
                if (!string.IsNullOrEmpty(resourceRootPath)) return resourceRootPath;
                resourceRootPath = HttpContext.Current.Server.MapPath("~/_resources/").Replace("_resources\\", "");
                return resourceRootPath;
            }
        }
        private static string uploadPath;
        public static string UploadPath
        {
            get
            {

                if (!string.IsNullOrEmpty(uploadPath)) return uploadPath;
                var localPath = WebConfigurationManager.AppSettings["UploadPath"];
                if (string.IsNullOrEmpty(localPath))
                {
                    throw new Exception("Could not find upload path!");
                }
                uploadPath = HttpContext.Current.Server.MapPath(localPath);
                Directory.CreateDirectory(uploadPath);

                return uploadPath;
            }
        }


        private static string imagesPath;
        public static string ImagesPath
        {
            get
            {
                if (!string.IsNullOrEmpty(imagesPath)) return imagesPath;
                imagesPath = HttpContext.Current.Server.MapPath("~/_resources/images/");
                Directory.CreateDirectory(imagesPath);
                return imagesPath;
            }
        }
        private static string filesPath;
        public static string FilesPath
        {
            get
            {
                if (!string.IsNullOrEmpty(filesPath)) return filesPath;
                filesPath = HttpContext.Current.Server.MapPath("~/_resources/files/");
                Directory.CreateDirectory(filesPath);
                return filesPath;
            }
        }

        private static string tempFolder;
        public static string TempFolder
        {
            get
            {
                if (!string.IsNullOrEmpty(tempFolder)) return tempFolder;
                tempFolder = HttpContext.Current.Server.MapPath("~/_resources/temp/");
                Directory.CreateDirectory(tempFolder);
                return tempFolder;
            }
        }

        public static string DefaultProfileText
        {
            get { return @"Profilbeskrivning"; }
            set { }
        }

        public static void EmptyTempFolder()
        {
            try
            {
                var path = TempFolder;
                var dirInfo = new DirectoryInfo(path);
                foreach (FileInfo file in dirInfo.GetFiles())
                {
                    file.Delete();
                }
                foreach (DirectoryInfo dir in dirInfo.GetDirectories())
                {
                    dir.Delete(true);
                }
            }
            catch (Exception ex)
            {

            }

        }

        public static string ToRealtivePath(string absolutePath)
        {
            var basePath = HttpContext.Current.Server.MapPath("~/_resources/");
            var relative = absolutePath.Replace(basePath.Replace("_resources\\", ""), "");
            return relative;
        }
    }


}
