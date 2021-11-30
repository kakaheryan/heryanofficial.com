import clsx from "clsx";
import { InferGetStaticPropsType } from "next";
import * as React from "react";

import useLoaded from "@/hooks/useLoaded";

import TextGradient from "@/components/attr/TextGradient";
import HeadMeta from "@/components/HeadMeta";
import Layout from "@/components/main/Layout";

export default function ProjectPage({
  repos,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Layout>
        <HeadMeta templateTitle="My Projects" />
        <main>
          <section
            className={clsx(
              "flex flex-col mb-10 mt-4 min-h-main layout",
              useLoaded() && "fade-in-start"
            )}
          >
            <h2 className="flex-none py-1 border-b-2 border-gray-300 dark:border-green-300">
              <TextGradient> My Projects </TextGradient>
            </h2>
            <ul className="grid gap-2 mt-4 sm:grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 lg:grid-cols-2">
              {repos.map((repo, index) => (
                <li key={repo.i} className="block overflow-hidden">
                  <div
                    className={clsx(
                      "bg-white dark:bg-opacity rounded-xl border  dark:border-none border-gray-200",
                      "md:flex"
                    )}
                    fade-side={1 + index}
                  >
                    <div className="p-3">
                      <a
                        href={repo.html_url}
                        className=" mt-1 text-base md:text-lg font-bold bg-clip-text dark:bg-gradient-to-r from-primary-500 via-primary-300 to-primary-400 dark:text-transparent hover:underline"
                      >
                        {repo.name}
                      </a>

                      <blockquote>
                        <p className="font-light mb-1 text-xs text-gray-500 dark:text-gray-400">
                          {repo.html_url}
                        </p>
                      </blockquote>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {repo.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const data = await fetch(
    "https://api.github.com/users/kakaheryan/repos?sort=created"
  );
  let repos = await data.json();

  repos = repos.map((i) => {
    return {
      name: i.name,
      html_url: i.html_url,
      description: i.description,
      language: i.language,
      last_update: i.updated_at,
    };
  });
  return {
    props: {
      repos,
    },
  };
}
