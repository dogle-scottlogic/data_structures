'use-client'

import Link from 'next/link'
import { normaliseUrl } from './utils/routes';
import { Structures } from './types/main';
import Header from './header';

export default function Home({ structures }: Structures) {
    return (
        <>
            <Header>Data Structures</Header>
            <ul>
                {structures.map(d =>
                    <li key={d}>
                        <Link href={normaliseUrl(d)}>{d}</Link>
                    </li>
                )}
            </ul>
        </>
    )
}