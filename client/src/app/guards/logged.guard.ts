import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../services/user.service';


export const LoggedInGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const userService = inject(UserService);

  const routerToMove = inject(Router).createUrlTree(["/dashboard"]);
  // const notLoggedIn = authService.notLoggedIn.pipe(
  //   map(isNotLoggedIn => {
  //     if (isNotLoggedIn) {
  //       return true;
  //     }
  //     return router.createUrlTree(["/dashboard"]);
  //   })
  // );

  const continueOnPage = userService.currentUser.pipe(map(user => {
    if (user) {
      console.log(user);
      return routerToMove;
    }
    return true;
  }))


  console.log("Checking User LoggedIn", continueOnPage)
  return continueOnPage;
}


export const DashboardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {


  return false;
}
