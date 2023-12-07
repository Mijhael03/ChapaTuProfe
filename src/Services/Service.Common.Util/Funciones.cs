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
            string imagePath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory.Replace("bin\\Debug\\net6.0\\", ""), "Images\\" + FileName);
         
            if (System.IO.File.Exists(imagePath))
            {
                Byte[] bytes = System.IO.File.ReadAllBytes(imagePath);
                photo = Convert.ToBase64String(bytes);
            }

            return photo;
        }
    }
}
