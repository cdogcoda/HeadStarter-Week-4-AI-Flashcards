'use client';

import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// import { useUser } from '@clerk/nextjs'; // Replace with your auth provider

export default function FlashcardSets() {
    // Example using Clerk's useUser hook
    // const { user, isLoaded, isSignedIn } = useUser();

    // Placeholder user variable (replace with actual logic)
    let user = { id: 'sampleUserId' }; // Remove this line when using real authentication

    const [flashcardSets, setFlashcardSets] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function getFlashcardSets() {
            if (!user) return;
            // Placeholder data - replace with actual API call or database query
            const sets = [
                { id: 1, name: 'Science Flashcards' },
                { id: 2, name: 'History Flashcards' },
                { id: 3, name: 'Math Flashcards' },
            ];
            setFlashcardSets(sets);
        }
        getFlashcardSets();
    }, [user]);

    const handleCardClick = (id) => {
        router.push(`/flashcards?id=${id}`);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Grid container spacing={2}>
                {flashcardSets.map((flashcardSet) => (
                    <Grid 
                        item 
                        xs={12} 
                        sm={6} 
                        md={4} 
                        key={flashcardSet.id}
                    >
                        <Card>
                            <CardActionArea 
                                onClick={() => handleCardClick(flashcardSet.id)}
                            >
                                <CardContent>
                                    <Typography
                                        variant='h5'
                                        component='div'
                                    >
                                        {flashcardSet.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
