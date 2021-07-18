import { NextPage, GetStaticProps } from "next";

type IndexProps = {
  texts: Array<{
    id: string;
    text: string;
    _created_at: string;
    _updated_at: string;
    _user_id: string;
  }>;
};

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const res = await fetch(
    "https://versatileapi.herokuapp.com/api/text/all?$orderby=_created_at%20desc&$limit=20"
  );
  const json = await res.json();
  return { props: { texts: json } };
};

const Index: NextPage<IndexProps> = ({ texts }) => {
  return (
    <>
      <h1>WebClient4Engineer</h1>
      <ul>
        {texts.map((text) => (
          <li key={text.id}>{text.text}</li>
        ))}
      </ul>
    </>
  );
};

export default Index;
