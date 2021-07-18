import { useState } from "react";
import { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

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
    baseUrl + "/text/all?$orderby=_created_at%20desc&$limit=100"
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
      <Head>
        <title>SNS for Engineer</title>
      </Head>
      <h1>SNS for Engineer</h1>
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
      <section className="texts">
        {texts.map((text) => (
          <div className="text">
            <div
              className="avatar_container"
              style={{
                background: "#" + text._user_id.slice(0, 6),
              }}
            >
              <div className="avatar">
                {text._user_id.slice(0, 2).toUpperCase()}
              </div>
            </div>
            <div className="message">{text.text}</div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Index;
