ng build --prod --aot
scp -r ./dist/kramerius-music/* deploy@music.kramerius.org:/home/deploy/kramerius-music-client/
