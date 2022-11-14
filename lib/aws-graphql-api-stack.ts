import * as path from "path";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apiGateway from "@aws-cdk/aws-apigateway";
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsGraphqlApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const graphqlLambda = new lambda.Function(this, "graphqlLambda", {
      code: lambda.Code.fromAsset(path.join(__dirname, "../lambda")),
      handler: "graphql.handler",
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    new apiGateway.LambdaRestApi(this, "graphqlEndpoint", {
      handler: graphqlLambda,
    });
  }
}
