import clsx from "clsx";
import { InferGetStaticPropsType } from "next";
import * as React from "react";

import { getAllFiles } from "@/lib/Client";
import useLoaded from "@/hooks/useLoaded";

import EmptyPage from "@/components/content/EmptyPage";
import ForListItem from "@/components/content/ForListItem";
import HeadMeta from "@/components/HeadMeta";
import Layout from "@/components/main/Layout";

export default function IndexPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <HeadMeta templateTitle="Blog Test" />
      <main>
        <section className={clsx(useLoaded() && "fade-in-start")}>
          <div className="py-12 layout">
            <h1 className="text-3xl md:text-5xl">Blog</h1>
            <ul
              className="grid gap-4 mt-4 sm:grid-cols-2 xl:grid-cols-3"
              fade-side="5"
            >
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <ForListItem key={post.slug} post={post} fade-side={index} />
                ))
              ) : (
                <EmptyPage />
              )}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllFiles("blog");
  return { props: { posts } };
}
