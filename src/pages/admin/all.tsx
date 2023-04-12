import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import { getShortenerList } from 'lib/services/notion/link-shortener/getShortenerList';
import type { ShortenedUrlEntry } from 'lib/services/notion/link-shortener/types';

const AllLinkPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const toast = useToast();
  const handleCopy = (slug?: string) => () => {
    const url = `https://sznm.link/${slug}`;
    navigator.clipboard.writeText(`https://sznm.link/${slug}`);
    if (!toast.isActive(url)) {
      toast({
        description: `${url} copied`,
        id: url,
        position: 'top-right',
        status: 'success',
      });
    }
  };

  return (
    <Grid gap={12}>
      <Heading>Links</Heading>

      <Grid gap={8} templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}>
        {data.map((entry) => (
          <Card borderRadius={24} shadow="lg">
            <CardHeader>
              <Button
                padding={0}
                variant="ghost"
                onClick={handleCopy(entry.slug)}
                fontSize="lg"
                fontWeight="bold"
              >
                {entry.slug}
              </Button>
            </CardHeader>
            <CardBody gap={2}>
              <Text
                fontSize="xs"
                color="gray"
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {entry.url}
              </Text>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
};

export const getStaticProps: GetStaticProps<{
  data: Array<Partial<ShortenedUrlEntry>>;
}> = async () => {
  const data = await getShortenerList();

  return {
    props: {
      data,
    },
    revalidate: 10,
  };
};

export default AllLinkPage;
