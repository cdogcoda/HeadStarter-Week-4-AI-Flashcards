'use client'

import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function Flashcards() {
    let user // Need to somehow retrieve the user's data; Bill's video uses Clerk Auth's useUser hook to get the loading status, login status, and the user
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState({})

    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    useEffect(() => {
        async function getFlashcards() {
            if (!search || !user) {
                return
            }
            const flashcardsList = [] 
            // Retrieve the specific set of flashcards and push each card into 'flashcardsList' 
            setFlashcards(flashcardsList)
        }
        getFlashcards()
    }, [search, user])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    return (
        <Container>
            <Grid>
                {flashcards.map((flashcard) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={flashcard.id}
                    >
                        <Card>
                            <CardActionArea
                                onClick={() => {handleCardClick(flashcard.id)}}
                            >
                                <CardContent>
                                    <Box sx={{}}>
                                        <div>
                                            <div>
                                                <Typography
                                                    variant='h5' component='div'
                                                >
                                                    {flashcard.front}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography
                                                    variant='h5'
                                                    component='div'
                                                >
                                                    {flashcard.back}
                                                </Typography>
                                            </div>
                                        </div>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}