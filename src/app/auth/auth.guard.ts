import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  console.log(route, route.routeConfig?.path)
  const currentmenu = route.routeConfig?.path
  
  const router = inject(Router)
  const token = sessionStorage.getItem('token')

  if (token) {
    if(currentmenu == 'login' || currentmenu == 'signup'){
      router.navigate([''])
      return false
    } else {
      return true
    }
  } else {
    router.navigate(['/login'])
    return false
  }
};



// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot
//     ): boolean | Promise<boolean> | Observable<boolean> {
//     if (sessionStorage.getItem('token')) {
//       console.log(sessionStorage.getItem('token'));
//       // If the token exists, prevent access to the login and signup pages
//       console.log(state, state.url)
//       if (state.url.includes('login') || state.url.includes('signup')) {
//         this.router.navigate(['/']); // Redirect to the home page or another appropriate route
//         return false;
//       }
//       return true;
//     }

//     // If there is no token, navigate to the login page
//     this.router.navigate(['/login']);
//     return false;
//   }
// }
