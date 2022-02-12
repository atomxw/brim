import LakeList from "app/lakes/list"
import LakeRoot from "app/lakes/root"
import {maybeShowReleaseNotes} from "app/release-notes/maybe-show-release-notes"
import ReleaseNotes from "app/release-notes/release-notes"
import AppTabsRouter from "app/router/app-tabs-router"
import {releaseNotes, root, lakeShow, lakeList} from "app/router/routes"
import AppWrapper from "app/routes/app-wrapper"
import React, {useEffect} from "react"
import {useDispatch} from "react-redux"
import {Redirect, Route, Switch} from "react-router"
import useStoreExport from "../../../app/core/hooks/useStoreExport"
import {defaultLake} from "../initializers/initLakeParams"
import Handlers from "../state/Handlers"
import useSearchShortcuts from "./useSearchShortcuts"

export default function App() {
  useStoreExport()
  const dispatch = useDispatch()
  useSearchShortcuts()
  useEffect(() => {
    dispatch(maybeShowReleaseNotes())
    return () => {
      dispatch(Handlers.abortAll())
    }
  }, [])

  return (
    <AppTabsRouter>
      <Switch>
        <Route path={lakeShow.path}>
          <AppWrapper>
            <LakeRoot />
          </AppWrapper>
        </Route>
        <Route path={lakeList.path}>
          <AppWrapper>
            <LakeList />
          </AppWrapper>
        </Route>
        <Route path={releaseNotes.path}>
          <AppWrapper>
            <ReleaseNotes />
          </AppWrapper>
        </Route>
        <Route path={root.path}>
          <Redirect to={`/lakes/${defaultLake().id}`} />
        </Route>
      </Switch>
    </AppTabsRouter>
  )
}
