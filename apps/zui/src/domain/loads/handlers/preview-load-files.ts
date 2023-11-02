import {createHandler} from "src/core/handlers"
import Current from "src/js/state/Current"
import LoadDataForm from "src/js/state/LoadDataForm"
import Pools from "src/js/state/Pools"
import {quickLoadFiles} from "./quick-load-files"

export const previewLoadFiles = createHandler(
  async (
    {dispatch, invoke, select},
    opts: {files: string[]; poolId?: string}
  ) => {
    const files = await invoke("loads.getFileTypes", opts.files)
    const lakeId = select(Current.getLakeId)
    const pool = select(Pools.get(lakeId, opts.poolId))
    const poolId = pool ? pool.id : null

    if (files.length === 1 && files[0].type === "pcap") {
      quickLoadFiles({files: files.map((f) => f.path), poolId})
    } else {
      dispatch(LoadDataForm.setPoolId(poolId))
      dispatch(LoadDataForm.setFiles(opts.files))
      dispatch(LoadDataForm.setShow(true))
    }
  }
)