'use client'

import { useState } from "react"
import { Container, TextField, Button, Typography, Box, Grid, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Card, CardContent } from "@mui/material"
import { db } from "@/prisma"
import { useSession } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils"

export default function Generate() {
    const session = useSession()
    if (!session) {
        redirect("/")
    }

    const [text, setText] = useState('')
    const [flashcards, setFlashcards] = useState(
        [
            {
              front: 'What is the origin country of the Labrador Retriever?',    
              back: 'The Labrador Retriever originated in Canada.'
            },
            {
              front: 'Which dog breed is known for its distinctive blue-black tongue?',
              back: 'The Chow Chow is known for its distinctive blue-black tongue.'
            },
            {
              front: 'What is the smallest breed of dog?',
              back: 'The Chihuahua is the smallest breed of dog.'
            },
            {
              front: "Which breed is commonly referred to as a 'sausage dog'?",  
              back: "The Dachshund is commonly referred to as a 'sausage dog'."  
            },
            {
              front: 'Which dog breed is known for its excellent herding abilities?',
              back: 'The Border Collie is known for its excellent herding abilities.'
            },
            {
              front: "What breed has a reputation for being gentle and is often called a 'gentle giant'?",
              back: "The Great Dane has a reputation for being a 'gentle giant'."
            },
            {
              front: 'Which breed often participates in rescue operations in the Swiss Alps?',
              back: 'The Saint Bernard often participates in rescue operations in the Swiss Alps.'
            },
            {
              front: 'What breed is famous for its fluffy white coat and playful personality?',
              back: 'The Samoyed is famous for its fluffy white coat and playful personality.'
            },
            {
              front: "Which dog breed is known for its high energy and distinctive 'smiling' face?",
              back: "The Siberian Husky is known for its high energy and distinctive 'smiling' face."
            },
            {
              front: 'What breed is known for its wrinkled face and sturdy build?',
              back: 'The Bulldog is known for its wrinkled face and sturdy build.'
            }
          ]
    )
    const [setName, setSetName] = useState('')
    const [dialogOpen, setDialogOpen] = useState('')

    const handleOpenDialog = () => setDialogOpen(true)
    const handleCloseDialog = () => setDialogOpen(false)

    // const createSet = async () => {
    //     const dbResponse = await db.flashcardSet.create({
    //         data: {
    //            name: setName,
    //            flashcards: flashcards,
    //            ownerId: session.data.user.id
    //         }
    //     })
    // }

    const saveFlashcards = async () => {
        if (!setName.trim()) {
            alert('Please enter a name for your flashcard set.')
            return
        }

        try {
            console.log('Saving flashcards:', { setName, flashcards });
            const response = await db.flashcardSet.create({
                data: {
                   name: setName,
                   flashcards: flashcards,
                   ownerId: session.data.user.id
                }
            })
            alert('Flashcards saved successfully!');
            setDialogOpen(false);
        } catch (error) {
            console.error('Error saving flashcards:', error)
            alert('An error occurred while saving flashcards. Please try again.')
        }
    }

    const handleSubmit = async () => {
        if (!text.trim()) {
            alert('Please enter some text to generate flashcards.')
            return
        }

        try {
            const response = await fetch('api/generate', {
                method: 'POST',
                body: text,
                headers: { 'Content-Type' : 'text/plain' }
            })

            if (!response.ok) {
                throw new Error('Failed to generate flashcards')
            }

            const data = await response.json()
            setFlashcards(data) //check if i need the .flashcards or not
        } catch (error) {
            console.error('Error generating flashcards:', error)
            alert('An error occurred while generating flashcards. Please try again.')
        }
    }

    return (
        <Container maxWidth='md'>
            <Box sx={{my: 4}}>
                <Typography 
                    variant='h4' 
                    component='h1' 
                    gutterBottom
                >
                    Generate Flashcards
                </Typography>
                <TextField
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    label='Enter text'
                    fullWidth
                    multiline
                    rows={4}
                    variant='outlined'
                    sx={{mb: 2}}
                >
                    
                </TextField>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleSubmit}
                    fullWidth
                >
                    Generate
                </Button>
                {flashcards.length > 0 && (
                    <Box>
                        <Typography
                            variant='h5'
                            component='h2'
                            gutterButtom
                        >
                            Generated Flashcards
                        </Typography>
                        <Grid
                            container
                            spacing={2}
                        >
                            {flashcards.map((flashcard, index) => (
                                <Grid 
                                    item 
                                    xs={12} 
                                    sm={6} 
                                    md={4} 
                                    key={index}
                                >
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6">Front: </Typography>
                                            <Typography>{flashcard.front}</Typography>
                                            <Typography variant="h6" sx={{mt: 2}}>Back: </Typography>
                                            <Typography>{flashcard.back}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
                <Dialog
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                >
                    <DialogTitle>Save Flashcard Set</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please name your flashcard set.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin='dense'
                            label='Set Name'
                            type='text'
                            fullWidth
                            value={setName}
                            onChange={(e) => setSetName(e.target.value)}

                        >

                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleCloseDialog}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={saveFlashcards}
                            color='primary'
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                {flashcards.length > 0 && (
                    <Box 
                        sx={{mt: 4, display: 'flex', justifyContent: 'center'}}
                    >
                        <Button 
                            variant='contained' 
                            color='primary' 
                            onClick={handleOpenDialog}
                        >
                            Save Flashcards
                        </Button>
                    </Box>
                )}
            </Box>
        </Container>
    )
}