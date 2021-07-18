import { useState } from "react";
import { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";

type IndexProps = {
  texts: Array<{
    id: string;
    text: string;
    _created_at: string;
    _updated_at: string;
    _user_id: string;
  }>;
};

const baseUrl = "https://versatileapi.herokuapp.com/api";

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const res = await fetch(
    baseUrl + "/text/all?$orderby=_created_at%20desc&$limit=20"
  );
  const json = await res.json();
  return { props: { texts: json } };
};

const submitMessage = (message: string) => {
  fetch(baseUrl + "/text", {
    method: "POST",
    headers: { Authorization: "HelloWorld" },
    body: JSON.stringify({ text: message }),
  });
};

const Index: NextPage<IndexProps> = ({ texts }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  return (
    <>
      <h1>WebClient4Engineer</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitMessage(message);
          router.reload();
        }}
      >
        <input
          type="text"
          placeholder="What are you coding?"
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
      <ul>
        {texts.map((text) => (
          <li key={text.id}>{text.text}</li>
        ))}
      </ul>
    </>
  );
};

export default Index;
