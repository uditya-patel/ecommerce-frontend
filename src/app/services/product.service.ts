import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private categoryUrl = 'http://localhost:8081/api/product-category';

  private baseUrl = 'http://localhost:8081/api/products';

  constructor(private httpClient: HttpClient) { }

  getProductListPaginate(thePage: number,
                        thePageSize: number,
                        theCategoryId: number): Observable<GetResponseProduct> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                        + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(map(Response => Response._embedded.productCategory));
  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    const searchUrl1 = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl1).pipe(map(Response => Response._embedded.products));


  }

  searchProductsPaginate(thePage: number,
                        thePageSize: number,
                        theKeyword: string): Observable<GetResponseProduct> {

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
        + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
    }

  getProduct(theProductId: number): Observable<Product> {

    const url = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(url);
  }

}

interface GetResponseProduct  {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number

  }
}

interface GetResponseProductCategory  {
  _embedded: {
    productCategory: ProductCategory[];
  }
}