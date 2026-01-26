"use client"

import React from 'react'
import { useSpeech } from '@/lib/SpeechContext'
import { cleanForSpeech } from '@/lib/utils'
import clsx from 'clsx'

interface HighlightableTextProps {
  text: string
  className?: string
  offset?: number
}

export function HighlightableText({ text, className, offset }: HighlightableTextProps) {
  const { isSpeaking, currentCharIndex, currentText, currentRange } = useSpeech()
  
  // Clean the text using standard utility
  const cleanLocalText = React.useMemo(() => cleanForSpeech(text), [text])

  if (!isSpeaking || !currentText) {
    return <span className={className}>{text}</span>
  }

  // Determine the start position of this component's text in the global text
  // We prioritize the provided offset, but we have a fallback if it doesn't match perfectly
  let startPos = -1;
  if (offset !== undefined) {
      // Fuzzy match: check if our text appears near this offset (handles minor cleaning drifts)
      const searchFragment = currentText.substring(offset, offset + cleanLocalText.length + 5);
      if (searchFragment.includes(cleanLocalText)) {
          startPos = currentText.indexOf(cleanLocalText, offset);
      }
  }
  
  // fallback if offset wasn't provided or didn't match
  if (startPos === -1) {
    startPos = currentText.indexOf(cleanLocalText)
    if (startPos !== -1 && isSpeaking) {
        // console.log(`[Highlight/Fallback] Found text at index ${startPos} instead of expected offset ${offset}`);
    }
  }
  
  if (startPos === -1) {
    return <span className={className}>{text}</span>
  }

  // --- Sentence / Range Highlight ---
  // If this component's text overlaps with the currently spoken range (sentence)
  const myStart = startPos
  const myEnd = startPos + cleanLocalText.length
  
  const isSectionActive = currentRange && (
    (myStart >= currentRange.start && myStart < currentRange.end) || // I start inside the range
    (myEnd > currentRange.start && myEnd <= currentRange.end) ||    // I end inside the range
    (currentRange.start >= myStart && currentRange.end <= myEnd)    // Range is entirely inside me
  )

  const localCharIndex = currentCharIndex - startPos
  
  // If no word is specifically active, but the section Is, highlight the whole block subtly
  if (isSectionActive && (localCharIndex < 0 || localCharIndex >= cleanLocalText.length)) {
      return (
        <span className={clsx(className, "bg-blue-50/50 rounded transition-colors duration-300")}>
          {text}
        </span>
      )
  }

  // --- Word Highlight ---
  if (localCharIndex < 0 || localCharIndex >= cleanLocalText.length) {
    return <span className={className}>{text}</span>
  }

  // Find word boundaries around localCharIndex in the CLEANED text
  // We look for spaces or the start/end of the string
  let start = localCharIndex
  while (start > 0 && !/\s/.test(cleanLocalText[start - 1])) {
    start--
  }
  
  let end = localCharIndex
  // Note: if the current character is a space, end might be equal to start.
  // We want to highlight the word that *starts* at or after the index.
  if (/\s/.test(cleanLocalText[localCharIndex]) && localCharIndex < cleanLocalText.length - 1) {
      // If we're on a space, move to next char
      let nextWord = localCharIndex + 1;
      while (nextWord < cleanLocalText.length && /\s/.test(cleanLocalText[nextWord])) {
          nextWord++;
      }
      // Only highlight if the next word is very close (handles potential minor index drift)
      if (nextWord - localCharIndex < 3) {
          start = nextWord;
          end = nextWord;
      }
  }

  while (end < cleanLocalText.length && !/\s/.test(cleanLocalText[end])) {
    end++
  }

  // Final check to avoid highlighting empty strings
  if (start === end) {
      return <span className={className}>{text}</span>
  }

  return (
    <span className={clsx(className, isSectionActive && "bg-blue-50/50 rounded transition-colors")}>
      {/* We render from cleanLocalText to ensure word indices match perfectly */}
      {cleanLocalText.substring(0, start)}
      <span className="bg-yellow-300 text-slate-900 rounded px-1 font-bold shadow-md transition-all duration-75 inline-block scale-110 mx-0.5 border border-yellow-400">
        {cleanLocalText.substring(start, end)}
      </span>
      {cleanLocalText.substring(end)}
    </span>
  )
}
