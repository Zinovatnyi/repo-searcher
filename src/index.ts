import { Observable, fromEvent} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map} from 'rxjs/operators';

function searchProject (projectName:string) {
  const projects$: Observable<any> = ajax.getJSON(`https://api.github.com/search/repositories?q=${projectName}+language:assembly&sort=stars&order=desc`);
  return projects$;
}
 
const projNameElem: HTMLInputElement = document.getElementById('input-name') as HTMLInputElement;

const projNameFromInput$: Observable<any> = fromEvent(projNameElem, 'input')
  .pipe(
    map((event: Event) => {
      searchProject((event.target as HTMLInputElement).value).subscribe(
        res => {
          let seachRes = res.items[res.items.length-1];
          divFactory(seachRes);
        }
      )
    }
  ));

const subscribeInput = projNameFromInput$.subscribe();

function divFactory(seachRes: any) {
  console.log(seachRes);
  let arrayResults: any[] = [];
  arrayResults.push(seachRes);
  for (let results of arrayResults) {
    let newDivText = document.createElement('a');
    let newDivImg = document.createElement('img');
        newDivText = document.body.appendChild(newDivText);
        newDivImg = document.body.appendChild(newDivImg);
        let somediv = document.getElementById('someDiv');
        document.body.insertBefore(newDivText, somediv);
        document.body.insertBefore(newDivImg, somediv);
        newDivText.innerHTML = "<h1>"+seachRes.name+"<h1>";
        newDivText.setAttribute('href', "https://github.com/"+seachRes.full_name);  
        newDivImg.src = seachRes.owner.avatar_url;
  }
}



























//#1
// const sequence$: Observable<number> = new Observable((subscriber: Subscriber<number>) => {
//   let count: number = 0;
//   console.log('coun start');
//   const interval: number = setInterval(() => {
//     subscriber.next(count++);
//     if (count == 5) {
//       clearInterval(interval);
//       subscriber.complete();
//     }
//   }, 1000);

// });

//#2
// const sequence$: Observable<number> = interval(1000);

//#3
// const sequence$: Observable<{name: string}[]> = of([{name: 'Vasya'}, {name: 'Vova'}]);


// sequence$.subscribe((val: {name: string}[]) => {
//     console.log('val', val);
//   }
// );


// Observable + Subscriber  = Subject 

// import {
//   AsyncSubject,
//   BehaviorSubject,
//   ConnectableObservable, interval,
//   Observable,
//   ReplaySubject,
//   Subject,
//   Subscription
// } from 'rxjs';
// import { map, multicast, publish, refCount, share, take, tap } from 'rxjs/operators';

// // const sequence$$: ReplaySubject<number> = new ReplaySubject<number>();
// // // const sub1: Subscription = sequence$$
// // //     .pipe(
// // //         map((x: number) => x ** 2)
// // //     )
// // //     .subscribe((value: number) => {
// // //         console.log(value);
// // //     });
// // // sub1.unsubscribe();
// //
// // sequence$$.next(1);
// // sequence$$.next(2);
// // sequence$$.next(3);
// //
// // sequence$$
// //     .pipe(
// //         map((x: number) => x ** 2)
// //     )
// //     .subscribe((value: number) => {
// //         console.log(value);
// //     }, () => {
// //     }, () => {
// //         console.log('complete');
// //     });
// //
// // sequence$$.next(4);

// // setTimeout(() => {
// //     sequence$$.complete();
// // }, 5000);
// //
// // setTimeout(() => {
// //     sequence$$
// //         .pipe(
// //             map((x: number) => x ** 2)
// //         )
// //         .subscribe((value: number) => {
// //             console.log(value);
// //         }, () => {
// //         }, () => {
// //             console.log('complete');
// //         });
// // }, 8000);

// // class ControlSequenceService {
// //     private sequence$$: Subject<number> = new Subject();
// //
// //     public getDate(): Observable<number> {
// //         return this.sequence$$.asObservable();
// //     }
// //
// //     public setData(data: number): void {
// //         this.sequence$$.next(data);
// //     }
// //
// // }
// //
// // const service: ControlSequenceService = new ControlSequenceService();
// // service.getDate().next()
// // service.setData(1);

// // multicast + Subject => publish
// // publish + refCount => share

// const connectableObservable$: Observable<number> = interval(1000)
//   .pipe(
//       tap((x: number) => console.log('tap =>', x)),
//       share()
//   );


// const sub1: Subscription = connectableObservable$.subscribe((v: number) => {
//   console.log('Sub 1 ==>', v);
// });
// let sub2: Subscription;
// setTimeout(() => {
//   sub2 = connectableObservable$.subscribe((v: number) => {
//       console.log('Sub 2 ==>', v);
//   });
// }, 5000)
// setTimeout(() => {
//   sub1.unsubscribe();
//   sub2.unsubscribe();
// }, 8000)

// setTimeout(() => {
//   connectableObservable$.subscribe((v: number) => {
//       console.log('Sub 3 ==>', v);
//   });
// }, 11000)