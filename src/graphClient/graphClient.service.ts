import { Injectable } from '@nestjs/common';
import { DocumentNode } from 'graphql';
import { execute } from '../../.graphclient';
import { pairsDocument } from '../../.graphclient';

@Injectable()
export class GraphClientService {
  fetchPairs(document: DocumentNode, options) {
    console.log(JSON.stringify(pairsDocument));
    return execute(document, options);
  }
}
