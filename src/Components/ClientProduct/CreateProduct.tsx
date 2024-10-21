'use client';

import { useSession } from "next-auth/react";

function ProductPage() {
    const { data: session } = useSession();

    return (
        <div>
            {session?.user?.email ? (
                <p>{session.user.email}</p>
            ) : (
                <p>No user logged in</p>
            )}
        </div>
    );
}

export default ProductPage;

