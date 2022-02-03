import { Box, Button, Center, Container, Text } from "@chakra-ui/react"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaTwitter } from "react-icons/fa"
import { TwitterShareButton } from "react-share"

const ShowPage: NextPage = () => {
  const router = useRouter()
  const slug = router.query.slug as string
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const currentURL = typeof location === "undefined" ? "" : location.href

  useEffect(() => {
    if (!slug) return

    setLoading(true)
    fetch(
      `https://asia-northeast1-booming-opus-329309.cloudfunctions.net/twitter_influ_score?id=${slug}`
    )
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <span>Loading...</span>

  return (
    <Container display="grid" placeItems="center">
      <Box border="gray" p="2">
        <Center>
          <Text fontSize="xl">スコア</Text>
        </Center>
        <Center>
          <Text fontSize="4xl" fontWeight="bold">
            {data.score}
          </Text>
        </Center>
      </Box>

      <Center>
        <TwitterShareButton
          title={`@${slug}のスコアは${data.score}です`}
          url={currentURL}
          resetButtonStyle
        >
          <Button
            bgColor="#00ACEE"
            color="white"
            _hover={{ bgColor: "" }}
            as="div"
          >
            <FaTwitter />
            <Text ml="2">Twitterで共有</Text>
          </Button>
        </TwitterShareButton>
      </Center>
    </Container>
  )
}

export default ShowPage
