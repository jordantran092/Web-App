export const dynamic = 'force-dynamic';

export default function notFound() {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>404 - Page Not Found</h2>
            <p>Could not find the requested resource.</p>
        </div>
    );
}
