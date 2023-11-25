using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Common.Util
{
    public class Funciones
    {
        public static string GetFile(string? FileName)
        {
            string photo = string.Empty;
            string workingDirectory = Environment.CurrentDirectory;
            string projectDirectory = Directory.GetParent(workingDirectory).Parent.Parent.FullName;
            string imagePath = projectDirectory + "\\DocumentApp\\" + FileName;

            if (System.IO.File.Exists(imagePath))
            {
                Byte[] bytes = System.IO.File.ReadAllBytes(imagePath);
                photo = Convert.ToBase64String(bytes);
            }

            return photo;
        }
    }
}
