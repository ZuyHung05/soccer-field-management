//package Main.response;
//
//import Main.entity.DatSanBong;
//
//public class ResponseData<T> {
//    private final int status;
//    private final String message;
//    private T data;
//
//    // PUT, PATCH, DELETE
//    public ResponseData(String message, int status) {
//        this.status = status;
//        this.message = message;
//    }
//    // GET, POST
//    public ResponseData(String message, T data, int status) {
//        this.message = message;
//        this.data = data;
//        this.status = status;
//    }
//
//    public T getData() {
//        return data;
//    }
//
//    public String getMessage() {
//        return message;
//    }
//
//    public int getStatus() {
//        return status;
//    }
//}
