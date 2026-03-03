"use client"

import initialMovies from '@/movies.json';
import { useState } from "react";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, ThumbsDown, ThumbsUp } from 'lucide-react';

export default function Movies() {
    const [movies, setMovies] = useState(initialMovies);

    const handleDate = (dateArray: any) => {
        const date = new Date(dateArray).toLocaleDateString("en-us", {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        return date;
    }

    const handlePosterClick = (index: number) => {
        const updatedMovies = [...movies];
        const movie = { ...updatedMovies[index] };
        movie.posterindex = (movie.posterindex + 1) % movie.posters.length;
        updatedMovies[index] = movie;
        setMovies(updatedMovies);
    }

    const handleLike = (index: number) => {
        const updatedMovies = [...movies];
        const movie = { ...updatedMovies[index] };
        movie.likes++;
        updatedMovies[index] = movie;
        setMovies(updatedMovies);
    }

    const handleDislike = (index: number) => {
        const updatedMovies = [...movies];
        const movie = { ...updatedMovies[index] };
        movie.dislikes++;
        updatedMovies[index] = movie;
        setMovies(updatedMovies);
    }
 
    return (
        <div className="flex flex-col items-center">
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 sm:grid-cols-1 gap-4 max-w-[1200] p-5">
                {movies.map((movie, index) => (
                    <Card className='relative' key={index}>
                        <img 
                            src={movie.posters[movie.posterindex]} 
                            onClick={() => handlePosterClick(index)} 
                            style={{
                                aspectRatio: 9/14,
                                objectFit: 'cover',
                                objectPosition: 'center'

                            }}
                            
                        />
                        <Badge className='absolute top-3 left-3'>
                            <Star />
                            {movie.iscore}
                        </Badge>
                        <Badge className='absolute top-3 right-3'>Poster {movie.posterindex + 1} of {movie.posters.length}</Badge>
                        <CardHeader>
                            <CardAction>
                                <Badge>Rated {movie.rating}</Badge>
                            </CardAction>
                            <CardTitle className='truncate'>{movie.title} ({movie.country})</CardTitle>
                            <CardDescription className='truncate'>
                                Released: {handleDate(movie.released)}
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className='grid grid-cols-4'>
                            <Button 
                                variant={'ghost'}
                                className='text-white'
                            >
                                <a href={movie.imdb} target='_blank' rel='noopener noreferrer'>
                                    IMDB
                                </a>
                            </Button>
                            <Button 
                                variant={'ghost'}
                                className='text-white'
                            >
                                <a href={movie.website} target='_blank' rel='noopener noreferrer'>
                                    Website
                                </a>
                            </Button>
                            <Button 
                                variant={'ghost'} 
                                onClick={() => handleLike(index)}
                                className='text-white'
                            >
                                <ThumbsUp />
                                {movie.likes}
                            </Button>
                            <Button 
                                variant={'ghost'} 
                                onClick={() => handleDislike(index)}
                                className='text-white'
                            >
                                <ThumbsDown />
                                {movie.dislikes}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}