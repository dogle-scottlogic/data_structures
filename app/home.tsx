'use-client'

import Link from 'next/link'
import { normaliseUrl } from './utils/routes';

export default function Home({ structures }: Structures) {
    return (
        <>
            <h1>Data Structures</h1>
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