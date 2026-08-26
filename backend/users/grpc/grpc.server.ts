import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { 
    registerUserDetails, 
    updateLoginDetails, 
    updateLogoutDetails, 
    updateUserNameDetails, 
    updateUserPhonenumberDetails
} from "./user-utils.grpc";


const PROTO_PATH = path.join(
    __dirname,
    "../proto/user.proto"
);


const packageDefinition =
    protoLoader.loadSync(
        PROTO_PATH,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        }
    );


const grpcPackage =
    grpc.loadPackageDefinition(
        packageDefinition
    ) as any;



const server = new grpc.Server();

server.addService(
    grpcPackage.users.UserService.service,
    {
        registerUser: registerUserDetails,
        updateLogin: updateLoginDetails,
        updateLogout: updateLogoutDetails,
        updateName: updateUserNameDetails,
        updatePhonenumber: updateUserPhonenumberDetails
    }
);


server.bindAsync( "0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), (error, port) => {
        if (error) {
            console.error("gRPC server failed:",error);
            return;
        }
        console.log(`User gRPC server running on ${port}`);
     server.start();
    }
);