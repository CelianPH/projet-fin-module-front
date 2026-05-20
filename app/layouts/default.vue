<template>
  <div class="min-h-screen bg-white flex flex-col text-black">
    <Navbar />
    <main class="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
      <slot />
    </main>
    <Footer />
  </div>
</template>
