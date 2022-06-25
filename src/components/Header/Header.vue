<template>
  <header>
    <meta name="theme-color" content="#21394f" />
    <title>
      {{ title || "JSON generator - The best interactive user file generator" }}
    </title>
    <meta name="type" content="website" />
    <meta name="author" :content="[author || 'clinton ezeagwuna']" />
    <meta property="og:type" content="website" />
    <meta property="og:image" :content="[seoImg || '']" />
    <meta
      property="twitter:careers__card"
      content="JSM: build a json file virtually"
    />
    <meta property="twitter:image" content="{seoImg}" />
    <meta
      name="title"
      :content="[
        title || 'JSON generator - The best interactive user file generator',
      ]"
    />
    <meta name="description" :content="[description]" />
    <meta property="og:url" :content="[siteUrl || '']" />
    <meta
      property="og:title"
      :content="[
        title || 'JSON generator - The best interactive user file generator',
      ]"
    />
    <meta property="og:description" :content="[description || '']" />
    <meta property="twitter:url" :content="[siteUrl || '']" />
    <meta
      property="twitter:title"
      :content="[
        title || 'JSON generator - The best interactive user file generator',
      ]"
    />
    <meta property="twitter:description" :content="[description || '']" />
    <meta
      name="viewport"
      content="initial-scale=1, width=device-width, shrink-to-fit=no"
    />
    <slot></slot>
  </header>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  author: String,
  title: String,
  description: String,
  siteUrl: String,
  seoImg: String,
});
</script>

<style lang="scss" scoped></style>
