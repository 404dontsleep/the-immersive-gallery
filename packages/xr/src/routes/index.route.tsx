import MuseumScene from "@/components/scenes/MuseumScene";
import { Route, Switch } from "wouter";

export default function IndexRoute() {
  return (
    <Switch>
      <Route path="/">
        <MuseumScene />
      </Route>
    </Switch>
  );
}
