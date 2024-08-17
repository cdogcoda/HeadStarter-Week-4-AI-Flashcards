'use client'

import { CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

export default function FlashcardSets() {
    let user // Need to somehow retrieve the user's data; Bill's video uses Clerk Auth's useUser hook to get the loading status, login status, and the user
    const [flashcardSets, setFlashcardSets] = useState()
    const router = useRouter() 

    useEffect(() => {
        async function getFlashcardSets() {
            // Retrieve the user's flashcard sets from the database
        }
    }, [user])

    const handleCardClick = (id) => {
        router.push(`/flashcards?id=${id}`)
    }

    return (
        <Container>
            <Grid>
                {flashcardSets.map((flashcardSet, index) => (
                    <Grid 
                        item 
                        xs={12} 
                        sm={6} 
                        md={4} 
                        key={index}
                    >
                        <Card>
                            <CardActionArea 
                                onClick={() => handleCardClick(flashcardSet.name)}
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
    )
}