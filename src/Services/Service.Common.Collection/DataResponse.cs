using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Common.Collection
{
    public class DataResponse
    {
        public const Int32 STATUS_CREADO = 1;
        public const Int32 STATUS_MODIFICADO = 2;
        public const Int32 STATUS_ERROR = -1;
        public const Int32 STATUS_EXCEPTION = -2;

        public int Code { get; set; }
        public string Message { get; set; }
        public Int64 IDbdGenerado { get; set; }
        public bool Status { get; set; }

        public DataResponse()
        {
            this.Code = STATUS_ERROR;
            this.Message = string.Empty;
            this.IDbdGenerado = 0;
            this.Status = true;
        }

        public DataResponse(Int32 status, String mensaje, Int64 idgenerado)
        {
            this.Code = status;
            this.Message = mensaje;
            this.IDbdGenerado = idgenerado;
        }
    }
    public class DataResponse<T> : DataResponse
    {
        public T Data { get; set; }
    }
}
