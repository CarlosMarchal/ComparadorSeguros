#!/bin/bash
# Doble clic en este archivo para levantar el comparador en local.
cd "$(dirname "$0")" || exit 1

echo "──────────────────────────────────────────────"
echo "  Comparador Marchal 2026 · entorno local"
echo "──────────────────────────────────────────────"
echo

if ! command -v npm >/dev/null 2>&1; then
  echo "No encuentro Node.js en este Mac."
  echo "Instálalo desde https://nodejs.org (versión LTS) y vuelve a abrir este archivo."
  echo
  read -r -p "Pulsa Intro para cerrar..."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Primera vez: instalando dependencias. Esto tarda un par de minutos..."
  echo
  npm install || { echo; echo "La instalación ha fallado."; read -r -p "Pulsa Intro para cerrar..."; exit 1; }
  echo
fi

echo "Arrancando el servidor de desarrollo..."
echo "Se abrirá solo en http://localhost:3000"
echo "Para pararlo: Control + C, o cierra esta ventana."
echo

( sleep 5 && open "http://localhost:3000" ) &
npm run dev
