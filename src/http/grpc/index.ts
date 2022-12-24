import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import UserController from '../../controllers/UserController';

// import UserController from '../../controllers/UserController';

const packageDefinition = protoLoader.loadSync(
  path.resolve(`${__dirname}/schema.proto`),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  },
);

const user_proto: any =
  grpc.loadPackageDefinition(packageDefinition).UserService;

const GetUser = async (call: any, callback: any) => {
  try {
    const controller = new UserController();
    callback(null, await controller.findById(call.request));
  } catch (err) {
    console.log(err);
    callback({
      code: grpc.status.INTERNAL,
      message: err.message,
    });
  }
};

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
const grpcServer = (): any => {
  const server = new grpc.Server();

  server.addService(user_proto.service, { GetUser });

  server.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    },
  );
  console.log('0.0.0.0:50051');
};

export default grpcServer;
