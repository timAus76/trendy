import {Component, OnInit} from '@angular/core';
import {ComponentStore} from "@ngrx/component-store";
import {Grid, Views, Product} from '../models';
import {map} from "rxjs/operators";
import ProductsJson from '../../assets/db.json';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [ComponentStore]
})
export class GridComponent implements OnInit {
  readonly gridItems$ = this.grid.state$.pipe(
    map(state => state.items),
  );

  readonly currentView$ = this.grid.state$.pipe(
    map(state => state.viewIndex),
  );

  readonly views = Object.values(Views);

  constructor(private grid: ComponentStore<Grid>) {
  }

  ngOnInit(): void {
    this.grid.setState({items: [], viewIndex: 0});
    this.patchItems(ProductsJson.products) // normally this function would be used in
    // the actions subscription.
  }

  patchItems(newItems: Product[]) {
    this.grid.patchState((state) => {
      return {items: state.items.concat(newItems)}
    })
  }

  setCurrentItem(item: Product) {
    this.grid.patchState((state) => {
      return {currentItem: item}
    });
    console.log(item);
  }

  changeView() {
    this.grid.patchState((state) => {
      return {viewIndex: state.viewIndex + 1 > 1 ? 0 : 1}
    })
  }

  getViewName() {
    // @ts-ignore
    return this.views[this.grid.get(state => state.viewIndex)];
  }

  isList() {
    // @ts-ignore
    return this.views[this.grid.get(state => state.viewIndex)] === Views.list;
  }

  isGrid() {
    // @ts-ignore
    return this.views[this.grid.get(state => state.viewIndex)] === Views.grid;
  }


}
