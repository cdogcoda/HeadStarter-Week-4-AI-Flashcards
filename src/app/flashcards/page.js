'use client';

import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { useState } from 'react';

export default function Flashcards() {
    const [flashcards] = useState([
        { id: 1, front: 'What is the capital of France?', back: 'Paris' },
        { id: 2, front: 'What is the largest planet?', back: 'Jupiter' },
        { id: 3, front: 'Who wrote "Hamlet"?', back: 'William Shakespeare' },
    ]);

    const [flipped, setFlipped] = useState({});

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Grid container spacing={2}>
                {flashcards.map((flashcard) => (
                    <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
                        <Box
                            sx={{
                                perspective: '1000px',
                                cursor: 'pointer',
                                width: '100%',
                                height: '200px',
                            }}
                            onClick={() => handleCardClick(flashcard.id)}
                        >
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '100%',
                                    transformStyle: 'preserve-3d',
                                    transform: flipped[flashcard.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                    transition: 'transform 0.6s',
                                }}
                            >
                                {/* Front Side */}
                                <Card
                                    sx={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backfaceVisibility: 'hidden',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h5">
                                            {flashcard.front}
                                        </Typography>
                                    </CardContent>
                                </Card>

                                {/* Back Side */}
                                <Card
                                    sx={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backfaceVisibility: 'hidden',
                                        transform: 'rotateY(180deg)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h5">
                                            {flashcard.back}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
