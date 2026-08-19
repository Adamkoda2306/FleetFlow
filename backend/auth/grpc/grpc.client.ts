import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.join(
    __dirname,
    "../proto/user.proto"
);

const packageDefinition = protoLoader.loadSync(
   PROTO_PATH,
   {
       keepCase: true,
       longs: String,
       enums: String,
       defaults: true,
       oneofs: true
   }
);

const grpcPackage = grpc.loadPackageDefinition(
    packageDefinition
) as any;

const USER_SERVICE_URL = process.env.USER_SERVICE_GRPC_URL || "localhost:50051";


export const userClient = new grpcPackage.users.UserService(
    USER_SERVICE_URL,
    grpc.credentials.createInsecure()
);