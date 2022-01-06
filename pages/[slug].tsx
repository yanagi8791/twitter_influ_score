import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ShowPage: NextPage = () => {
  const router = useRouter()
  const slug = router.query.slug as string
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    // TODO: ここをCloud FunctionsのエンドポイントのURLに変更する
    fetch(`https://asia-northeast1-booming-opus-329309.cloudfunctions.net/twitter_influ_score?id=${slug}`)
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <span>Loading...</span>

  return <div>{JSON.stringify(data)}</div>
}

export default ShowPage
