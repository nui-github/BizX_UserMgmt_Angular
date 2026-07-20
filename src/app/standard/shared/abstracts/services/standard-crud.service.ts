import { Observable } from 'rxjs';
import { IPaginationResponse, StandardResponse } from '../../models/standard-response.model';
import { StandardPaginationRequest } from '../../models/standard-request.model';

export abstract class StandardCrudService<T, ID> {

  constructor() { }

  abstract getTracking(paginationRequest: StandardPaginationRequest<any>) : Observable<StandardResponse<any>>;

  abstract getById(id: ID) : Observable<StandardResponse<any>>;

  abstract create(model: T): Observable<StandardResponse<any>> | Observable<StandardResponse<void>>

  abstract update(model: T): Observable<StandardResponse<any>> | Observable<StandardResponse<void>>

  abstract delete(model: T | ID): void | Observable<void> | Observable<StandardResponse<void>>
}
