"use-client";

import Link from "next/link";
import { normaliseUrl } from "utils/routes";
import { Structures } from "types/main";
import Header from "components/header";

export default function Home({ structures }: Structures) {
  return (
    <>
      <Header>Data Structures</Header>
      <div className="flex">
        <ul className="pl-10 text-nowrap">
          {structures.map((d) => (
            <li key={d}>
              <Link href={normaliseUrl(d)}>{d}</Link>
            </li>
          ))}
        </ul>
        <p className="pl-30 pr-30">
          A data structure is a way of formatting data so that it can be used by
          a computer program or other system. Data structures are a fundamental
          component of computer science because they give form to abstract data
          points. In this way, they allow users and systems to efficiently
          organize, work with and store data. Data structures combine primitive
          data types such as numbers, characters, booleans and integers into a
          cohesive format. Alone, each of these primitive data types possesses
          only a single value. When they are combined in a data structure, they
          enable higher-level data operations such as sorting, searching,
          insertion and deletion.
        </p>
      </div>
    </>
  );
}
