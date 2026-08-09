function dogYears(planet, seconds) {
    const earthYearInSeconds = 31557600
    
    const orbitalPeriods = {
        mercury: 0.2408467,
        venus:   0.61519726,
        earth:   1.0,
        mars:    1.8808158,
        jupiter: 11.862615,
        saturn:  29.447498,
        uranus:  84.016846,
        neptune: 164.79132,
    }

    const earthYears = seconds / earthYearInSeconds
    const planetYears = earthYears / orbitalPeriods[planet]
    const dogAge = planetYears * 7

    return parseFloat(dogAge.toFixed(2))
}

// tests
console.log(dogYears("earth", 1000000000))    // 221.82
console.log(dogYears("mercury", 1000000000))  // 921.3
console.log(dogYears("venus", 1000000000))    // 360.59